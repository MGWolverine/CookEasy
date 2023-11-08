from .db import db, environment, SCHEMA, add_prefix_for_prod

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    recipe_image = db.Column(db.Text, nullable=False)
    description = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
    prep_time = db.Column(db.Integer, nullable=False)
    cook_time = db.Column(db.Integer, nullable=False)
    total_time = db.Column(db.Integer, nullable=False)
    ingredients = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationship("User", back_populates="recipe")
    comments = db.relationship("Comment", back_populates="recipe")
    ingredient = db.relationship("Ingredient", back_populates="recipe")
    rating = db.relationship("Rating", back_populates="recipe")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'recipe_image': self.recipe_image,
            'description': self.description,
            'instructions': self.instructions,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'total_time': self.total_time,
            'ingredients': self.ingredients,
            'user_id': self.user_id,
            'comments': [comment.to_dict() for comment in self.comments],
        }