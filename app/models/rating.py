from .db import db, environment, SCHEMA, add_prefix_for_prod

class Rating(db.Model):
    __tablename__ = 'ratings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    rating = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="rating")
    recipe = db.relationship("Recipe", back_populates="rating")

    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'user_id': self.user_id,
            'rating': self.rating,
        }