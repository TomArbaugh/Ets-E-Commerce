from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class ProductImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    submit = SubmitField('submit')