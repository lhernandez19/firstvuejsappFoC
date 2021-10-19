// Header Component
const MyHeaderComponent = Vue.component('MyHeader', {

    template: ` 
    <nav class="navbar navbar-light bg-light justify-content-around">
        <a class="navbar-brand">Roster List</a>
    </nav> 
    `,
});

// Employee Form
const EmployeeForm = Vue.component('EmployeeForm',{

    data(){
        return {
            newEmployee: new Employee,
        }
    },

    props: {
        addMethodEmployee: {
            type: Function,
            required: true,
        }

    },

    methods: {
        addEmployee(){
            this.addMethodEmployee(this.newEmployee);

        },
    },

    template: ` 
    <form class="container bg-light text-dark my-3 py-3 rounded">
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="newEmployee.name" >
        <div class="valid-feedback">
            Looks good!
          </div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" v-model="newEmployee.email" >
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="position">Position</label>
        <input type="text" class="form-control" id="position" v-model="newEmployee.position" >
      </div>
      <div class="col-md-6 mb-3">
        <label for="salary">Salary</label>
        <input type="text" class="form-control" id="salary" v-model="newEmployee.salary" >
      </div>
    </div>
    <button class="btn btn-primary" type="submit" @click.prevent="addEmployee" >Submit form</button>
    </form>   
    `,
});

// Customer Form
const CustomerForm = Vue.component('CustomerForm',{

    data(){
        return {
            newCustomer: new Customer,
        }
    },

    props: {
        addMethodCustomer: {
            type: Function,
            required: true,
        }

    },

    methods: {
        addCustomer(){
            this.addMethodCustomer(this.newCustomer);

        },
    },

    template: ` 
    <form class="container bg-light text-dark my-3 py-3 rounded">
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="newCustomer.name" >
        <div class="valid-feedback">
            Looks good!
          </div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" v-model="newCustomer.email" >
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="leadSource">Lead Source</label>
        <input type="text" class="form-control" id="leadSource" v-model="newCustomer.leadSource" >
      </div>
      <div class="col-md-6 mb-3">
        <label for="consumerSpending">Consumer Spending</label>
        <input type="text" class="form-control" id="salary" v-model="newCustomer.consumerSpending" >
      </div>
    </div>
    <button class="btn btn-primary" type="submit" @click.prevent="addCustomer" >Submit form</button>
    </form>   
    `,
});

// Roster Component
const RosterComponent = Vue.component('Roster', {
    
    data() {
        return {
            roster: new RosterCollection ()
            .addItem(new Employee('John', 'john@email.com', 'Manager', '$100,000', 'Employee'))
            .addItem(new Customer('Luke', 'luke@email.com', 'Inbound', '$2,000', 'Customer'))
            .addItem(new Employee('Jenny', 'jenny@email.com', 'Accounting', '$80,000', 'Employee'))
            .addItem(new Customer('Mary', 'mary@email.com', 'TV', '$6,000', 'Customer'))
            .addItem(new Employee('Tom', 'tom@email.com', 'Manager', '$100,000', 'Employee'))
            .addItem(new Customer('Jimmy', 'jimmy@email.com', 'Outbound', '$9,000', 'Customer'))
            .addItem(new Employee('Lisa', 'lisa@email.com', 'Operations', '$60,000', 'Employee'))
            .addItem(new Customer('Sue', 'sue@email.com', 'Youtube', '$5,000', 'Customer'))
        }
    },

    methods:{
        addEmployee: function(newEmployee){
            this.roster.push(newEmployee);
        },

        addCustomer: function(newCustomer){
            this.roster.push(newCustomer);
        },

        removeIt(item){
            this.roster.splice(this.roster.indexOf(item), 1);
        },

    },

    template: `
    <div class="container bg-light text-dark my-3 py-3 rounded ">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-link active" id="nav-employee-tab" data-toggle="tab" href="#nav-employee" role="tab" aria-controls="nav-employee" aria-selected="true">Employee</a>
                <a class="nav-link" id="nav-customer-tab" data-toggle="tab" href="#nav-customer" role="tab" aria-controls="nav-customer" aria-selected="false">Customer</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-employee" role="tabpanel" aria-labelledby="nav-employee-tab">
            <employee-form v-bind:add-method-employee="addEmployee"></employee-form>
            </div>
            <div class="tab-pane fade" id="nav-customer" role="tabpanel" aria-labelledby="nav-customer-tab">
            <customer-form v-bind:add-method-customer="addCustomer"></customer-form>
            </div>
        </div>
     
        <div class="dropdown-divider pb-4"></div>

        <h4>Active: {{roster.length}}</h4>
        <div class="d-flex justify-content-center flex-wrap">
            <roster-item v-for="item in roster" :item="item" :key="item.name"
        @remove-item="removeIt"></roster-item>
        </div>
        
    </div>
    `,

});


// Roster Item Component
const RosterItemComponent = Vue.component ('RosterItem', {
    props: {
        item: Object
    },

    methods: {
        removeIt(item){
            this.$emit('remove-item', this.item)
        },
        
    },

    computed: {
        typeOfItem(){
            return this.item.constructor.name;
        }
    },
    
    template: `
    <div class="rounded p-3 m-3 shadow">
        <component :is="typeOfItem" :item="item"></component>
        <button type="button" class="btn btn-danger" @click="removeIt"><i class="fas fa-trash-alt"></i></button>
        </div>
    `,
});


// Employee Component
const EmployeeComponent = Vue.component ('Employee', {
    props: {
        item: Employee
    },

    template: `
    <div class="employee">
        <img class="mx-auto d-block mb-3" src="avatar.png"> </img>
        <h5>Name: {{item.name}}</h5>
        <p>Email: {{item.email}}</p>
        <p>Position: {{item.position}}</p>
        <p>Annual Salary: {{item.salary}}</p>
        <p>Type: {{item.recordType}}</p>
    </div>
    `,
});


// Customer Component
const CustomerComponent = Vue.component ('Customer', {
    props: {
        item: Customer
    },
    
    template: `
    <div class="customer">
        <img class="mx-auto d-block mb-3" src="avatar.png"> </img>
        <h5>Name: {{item.name}}</h5>
        <p>Email: {{item.email}}</p>
        <p>Lead Source: {{item.leadSource}}</p>
        <p>Consumer Spend: {{item.consumerSpending}}</p>
        <p>Type: {{item.recordType}}</p>
    </div>
    `,
});


// Footer
const MyFooterComponent = Vue.component('MyFooter',{

    template: ` 
    <div class="container-fluid text-center bg-secondary text-white py-3">
        <span class="">Luis Diego Hernandez - WCTC</span>
    </div>
    `,
});


//<button type="button" class="btn btn-warning" @click=""><i class="fas fa-pen"></i></button>
