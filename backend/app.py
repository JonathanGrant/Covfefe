import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

DB_FILE = "data.db"
FLAVORS = [
    "Elvazio",
    "etc"
]


@app.route('/vote', methods=["POST"])
def vote():
    """
    Rate a flavor of covfefe.

    Expecting post body to be:
        :param str flavor: Flavor to rate.
        :param int score: Score from (0-5).
        :param str note: Note to add to rating (optional).
    """
    flavor, score, note = request.json["flavor"], request.json["score"], request.json.get("note", "")
    conn = sqlite3.connect(DB_FILE)
    command = "INSERT INTO ratings(flavor,score,note) VALUES(?,?,?)"
    cursor = conn.cursor()
    cursor.execute(command, (flavor, score, note))
    conn.close()
    return jsonify({"status": "Success!"})


@app.route("/flavors")
def get_flavors():
    """Return all flavors for ratings."""
    return jsonify(FLAVORS)

if __name__ == '__main__':
    app.run(host="0.0.0.0")

