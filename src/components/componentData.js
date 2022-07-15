import { required, email, minLength, helpers  } from '@vuelidate/validators'

export function alteringCursor(value) {
    document.body.style.cursor = value
}

export const signUpFormValidations = {
    signupData: {
        name: { required: requiredError(required, 'Name') } ,
        email: { required: requiredError(required, 'Email'), email: helpers.withMessage('Email Address is not Valid', email) },
        password: { required: requiredError(required, 'Password'), minLength: helpers.withMessage('Password should be 5 digits long', minLength(5)) },
        gender: { required: requiredError(required, 'Gender') },
        phone: { required: requiredError(required, 'Phone Number') },
        country: { required: requiredError(required, 'Country') },
        address: { required: requiredError(required, 'Address') },
        city: { required: requiredError(required, 'City') },
        zipcode: { required: requiredError(required, 'Zip Code') },
    },
    dob: { required },
    viewImage: { required },
}

function requiredError(required, fieldName) {
    return helpers.withMessage(`${fieldName} is Required`, required)
}
export const loginFormValidations = {
    loginData: {
        username: { required: requiredError(required, 'Email'), email: helpers.withMessage('Email Address is not Valid', email) },
        password: { required: requiredError(required, 'Password') }
    }
}

export const menuLinks = [
    { name: 'Find Bubble', path: '/all-bubbles', svg: 'plus.svg' },
    { name: 'Find Wobler', path: '/all-woblers', svg: 'users.svg' },
    { name: 'Saved', path: '/saved-woblers', svg: 'heart.svg' },
    { name: 'Profile', path: '/profile', svg: 'user.svg' },
    { name: 'Support', path: '/FAQs', svg: 'support.svg' },
    { name: 'Share', path: '/share', svg: 'share.svg' },
    { name: 'Settings', path: '/settings', svg: 'settings.svg' },
]

export const subViews = ['AllBubbles', 'AllWoblers', 'SavedWoblers', 'UserProfile', 'ViewBubble', 'FAQs', 'UserSettings']

export const genderOptions = ['male','female', 'non-binary', 'transgender', 'intersex']

export function convertDateFormat(date) {
    const dateArr = date.split("-");
    let day = dateArr[0];
    let month = dateArr[1];
    let year = dateArr[2];
    return year + "-" + month + "-" + day;
}

export function convertStringDateTimeToDate(str) {
    let comment = new Date(parseInt(str))
    let commentDate = comment.toJSON().slice(0,10).replace(/-/g,'/')
    let today = new Date()
    let todayDate = today.toJSON().slice(0,10).replace(/-/g,'/')
    // checking if comment's date is today's date
    if (todayDate === commentDate) return 'Today'
    let yesterday = new Date(Date.now() - 864e5)
    let yesterdayDate = yesterday.toJSON().slice(0,10).replace(/-/g,'/')
    // checking if comment's date is yesterday's date
    if (yesterdayDate === commentDate) return 'Yesterday'
    // return comment's original date if it's not today or yesterday
    return commentDate
}

export function getAge(dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
    return age
}

