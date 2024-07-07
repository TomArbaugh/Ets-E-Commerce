from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField
from wtforms.validators import DataRequired, NumberRange, Length

class CreateReview(FlaskForm):
    # product_id = IntegerField('product_id', validators=[DataRequired()])
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired(), Length(min=2, max=2000)])
    stars = IntegerField('stars', validators=[DataRequired(), NumberRange(min=1, max=5)])
    # created_at = DateField('created_at')
    # updated_at = DateField('updated_at')
