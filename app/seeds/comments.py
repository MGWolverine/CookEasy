from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        recipe_id=1,
        user_id=1,
        rating=4,
        comment='Very good recipe, will try again',
    )
    db.session.add(comment1)

    comment2 = Comment(
        recipe_id=1,
        user_id=1,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment2)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()