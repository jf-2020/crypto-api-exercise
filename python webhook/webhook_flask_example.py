# webhook_flask_example.py - this prgm will implement a basic flask
#							 app to test a simple webhook.
#
# jf - 5/17

from flask import Flask, request, abort

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
	if request.method == 'POST':
		print(request.json)
		return '', 200
	else:
		abort(400)


if __name__ == '__main__':
	app.run()