from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), unique=False,nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=True)
   



    def to_json(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'email': self.email,
            'role': self.role,
            'description': self.description,
           
     
        }
    