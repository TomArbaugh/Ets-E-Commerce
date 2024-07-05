from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(max=50)])
  category = StringField('Category', validators=[DataRequired(), Length(max=50)] )
  description =  StringField('Description', validators=[DataRequired(), Length(max=255)])
  price =  DecimalField('Price', validators=[DataRequired(), NumberRange(min=0)])
  stock =  IntegerField('Stock', validators=[DataRequired(), NumberRange(min=0)])
  submit = SubmitField('Submit')

