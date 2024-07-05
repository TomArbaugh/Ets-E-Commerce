from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired()])
    submit = SubmitField('submit')