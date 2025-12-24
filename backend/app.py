from flask import request, jsonify
from config import app, db
from models import Contact


#GET all contacts endpoint
@app.route("/contacts", methods=['GET']) # Endpoint to get all contacts
def get_contacts():
    contacts = Contact.query.all()
    json_constact = map(lambda x: x.to_json(), contacts)  #get all contacts from the database
    return jsonify([contact.to_json() for contact in contacts]), 200
    
#POST contact endpoint
@app.route("/contacts", methods=['POST']) # Endpoint to create a new contact
def create_contact():
    try:
        data = request.get_json() #get data from request

        reqired_fields = ['first_name','email', 'role', 'description'] #required fields for creating a contact
        for field in reqired_fields: #field validation
            if field not in data: #\\check if field is missing
                return jsonify({"error": f'Missing reuqired: {field}' }), 400 #return error if field is missing
            

        new_contact = Contact(
            first_name=data.get('first_name'),
            email=data['email'],
            role=data['role'],
            description=data['description']
        )
        db.session.add(new_contact)
        db.session.commit()
        return jsonify(new_contact.to_json()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
#Delete contact endpoint
@app.route("/contacts/<int:id>", methods=['DELETE']) # Endpoint to delete a contact by ID
def delete_contact(id):
    try:
        contact = Contact.query.get(id)
        if contact is None:
            return jsonify({"error": "Contact not found"}), 404

        db.session.delete(contact) #delete contact from database
        db.session.commit() #commit changes to database

        return jsonify({"message": "Contact has gone bye bye successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
#update contact endpoint
@app.route("/contacts/<int:id>", methods=['PATCH'])
def update_contact(id):
    try:
        contact = Contact.query.get(id)
        if contact is None:
            return jsonify({"error": "Contact not found"}), 404

        data = request.get_json()
        contact.first_name = data.get('first_name', contact.first_name)
        contact.email = data.get('email', contact.email)
        contact.role = data.get('role', contact.role)
        contact.description = data.get('description', contact.description)

        db.session.commit()
        return jsonify(contact.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__': # Run the Flask application
    with app.app_context():
        db.create_all()

    app.run(debug=True)

