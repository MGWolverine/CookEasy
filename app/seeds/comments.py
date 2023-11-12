from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        recipe_id=1,
        user_id=2,
        rating=4,
        comment='Very good recipe, will try again',
    )
    db.session.add(comment1)

    comment2 = Comment(
        recipe_id=1,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment2)

    comment3 = Comment(
        recipe_id=2,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment3)

    comment4 = Comment(
        recipe_id=2,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment4)

    comment5 = Comment(
        recipe_id=3,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment5)

    comment6 = Comment(
        recipe_id=3,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment6)

    comment7 = Comment(
        recipe_id=4,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment7)

    comment8 = Comment(
        recipe_id=4,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment8)

    comment9 = Comment(
        recipe_id=5,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment9)

    comment10 = Comment(
        recipe_id=5,
        user_id=2,
        rating=2,
        comment='Very MEH recipe, probably will not try again',
    )
    db.session.add(comment10)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()