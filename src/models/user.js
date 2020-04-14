
function User(email, password, id, isAdmin) {

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const validateEmail = email => typeof email === 'string' && email.match(emailRegex) !== null ? email : null;
    const validatePassword = password => typeof password === 'string' ? password : null;
    const validateId = id => typeof id === 'number' ? id : null;
    const validateAdmin = isAdmin => typeof isAdmin === 'boolean' ? isAdmin : null;

    const allDetailsTrue = !validateEmail(email) && !validatePassword(password) && !validateId(id) && !validateAdmin(isAdmin) && true

    if (allDetailsTrue) {
        return {
            email: email,
            password: password,
            id: id,
            admin: isAdmin
        }
    }
    else {
        throw new Error('Incomplete Details')
    }
}
// class User {
//     constructor(email, password, id, isAdmin) {

//         this.emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//         this.email = typeof email === 'string' && email.match(this.emailRegex) !== null ? email : null;
//         this.password = typeof password === 'string' ? password : null;
//         this.id = typeof id === 'number' ? id : null;
//         this.admin = typeof isAdmin === 'boolean' ? isAdmin : null;
//     }
// }

module.exports = User;

