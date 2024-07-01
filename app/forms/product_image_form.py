from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, URL

class ProductImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired(), URL()])
    submit = SubmitField('submit')