from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'super secret key' # Needed for session management

def apply_rule1(s):
    if s.endswith('I'):
        return s + 'U'
    return s

def apply_rule2(s):
    if s.startswith('M'):
        return 'M' + s[1:] + s[1:]
    return s

def apply_rule3(s):
    return s.replace('III', 'U', 1) # Replace only the first occurrence

def apply_rule4(s):
    return s.replace('UU', '', 1) # Replace only the first occurrence

@app.route('/', methods=['GET'])
def index():
    if 'current_string' not in session:
        session['current_string'] = 'MI'
        session['history'] = ['MI']
    return render_template('index.html', current_string=session['current_string'], history=session['history'])

@app.route('/apply_rule/<int:rule_num>', methods=['POST'])
def apply_rule_route(rule_num):
    current_string = session.get('current_string', 'MI')
    new_string = current_string

    if rule_num == 1:
        new_string = apply_rule1(current_string)
    elif rule_num == 2:
        new_string = apply_rule2(current_string)
    elif rule_num == 3:
        new_string = apply_rule3(current_string)
    elif rule_num == 4:
        new_string = apply_rule4(current_string)

    if new_string != current_string:
        session['current_string'] = new_string
        history = session.get('history', ['MI'])
        history.append(new_string)
        session['history'] = history

    return redirect(url_for('index'))

@app.route('/reset', methods=['POST'])
def reset_game():
    session['current_string'] = 'MI'
    session['history'] = ['MI']
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
