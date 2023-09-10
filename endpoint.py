from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def endpoint():
    # Getting the query parameters
    dannyboy = request.args.get('dannyboy')
    backend = request.args.get('backend')

    # Get current UTC time and day of the week
    now = datetime.utcnow()
    current_utc_time = now.strftime('%Y-%m-%dT%H:%M:%SZ')
    current_day = now.strftime('%A')

    response = {
        "slack_name": dannyboy,
        "current_day": sunday,
        "utc_time": current_utc_time,
        "track": backend,
        "github_file_url": "https://github.com/username/repo/blob/main/endpoint.py",
        "github_repo_url": "https://github.com/nielsen2e/stage1",
        "status_code": 200
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
