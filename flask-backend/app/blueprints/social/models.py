from app import db
from datetime import datetime as dt

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=dt.utcnow)
    date_updated = db.Column(db.DateTime, onupdate=dt.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<id: {self.id} | Body: {self.body[:15]}>'

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def edit(self, body):
        self.body = body
        self.save()

    def to_dict(self):
        data={
            'id': self.id,
            'body': self.body,
            'date_created': self.date_created,
            'date_updated': self.date_updated
        }
        return data


