from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    comment_text = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="comment")
    recipe = db.relationship("Recipe", back_populates="comment")

    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'user_id': self.user_id,
            'comment_text': self.comment_text,
            'created_at': self.created_at
        }