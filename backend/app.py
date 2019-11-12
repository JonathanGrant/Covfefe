import sqlite3
from collections import defaultdict
from flask import Flask, request, jsonify

app = Flask(__name__)

DB_FILE = "/home/jon/covfefe/backend/data.db"
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
    data = request.get_json(force=True)
    flavor, score, note = data["flavor"], data["score"], data.get("note", "")
    conn = sqlite3.connect(DB_FILE)
    command = "INSERT INTO ratings(flavor,score,note) VALUES(?,?,?)"
    cursor = conn.cursor()
    cursor.execute(command, (flavor, score, note))
    conn.commit()
    cursor.close()
    conn.close()
    print("Inserted {}, {}, {}".format(flavor, score, note))
    return jsonify({"status": "Success!"})


@app.route("/flavors")
def get_flavors():
    """Return all flavors for ratings."""
    return jsonify(FLAVORS)


@app.route("/ratings")
def get_ratings():
    """Return all ratings in database. Frontend can handle averages, etc."""
    conn = sqlite3.connect(DB_FILE)
    command = "SELECT * FROM ratings"
    cursor = conn.cursor()
    cursor.execute(command)
    all_rows = cursor.fetchall()
    cursor.close()
    conn.close()

    # Turn rows into dictionary where key is coffee name and values are ratings
    ratings = defaultdict(list)
    for row in all_rows:
        ratings[row[0]].append({"score": row[1], "note": row[2]})

    return jsonify(ratings)


if __name__ == '__main__':
    app.run(host="0.0.0.0")

