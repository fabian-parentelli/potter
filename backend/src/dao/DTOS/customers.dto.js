export default class CustomersDto {

    constructor(user) {

        this.name =  user.name.toLowerCase(),
        this.address = user.address.toLowerCase(),
        this.phone = user.phone,
        this.email = user.email,
        this.type = user.type
        this.customerOf = user.customerOf
    };
};