from flask import Flask, render_template

app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Routes for individual games
@app.route('/game/tic_tac_toe')
def tic_tac_toe():
    return render_template('tic_tac_toe.html')

@app.route('/game/memory_game')
def memory_game():
    return render_template('memory_game.html')

@app.route('/game/snake_game')
def snake_game():
    return render_template('snake_game.html')

@app.route('/game/pong_game')
def pong_game():
    return render_template('pong_game.html')

@app.route('/game/breakout_game')
def breakout_game():
    return render_template('breakout_game.html')

if __name__ == '__main__':
    app.run(debug=True)
