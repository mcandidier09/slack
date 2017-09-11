class IndexCtrl {
    constructor($scope, CompanyService, localStorageService, $state) {
        'ngInject';
        this.state = $state;
        this.localStorageService = localStorageService;
        this.CompanyService = CompanyService;
        
        // get all companies for current user
        CompanyService.companyList().then(resp =>{
            this.companies = resp.data;
        });
    }

    companySelect(company) {
        this.localStorageService.set('companyId', company.id);
        this.CompanyService.setupCompany().then( () => {
            this.state.go('company.detail', {'name': company.name});
        });
    }
}

class CompanyDetailCtrl {
    constructor($scope, CompanyService, $stateParams, localStorageService) {
        'ngInject';
        this.CompanyService = CompanyService;
        this.init();
    }

    init() {
        this.CompanyService.getAllChannels().then(resp => {
            this.channels = resp.data;
        });

        this.CompanyService.getAllMembers().then( resp => {
            resp.data.map( user => {
                this.CompanyService.members[user.member] = user;
            });
        });
    }
}


class ChannelMessagesCtrl {
    constructor($scope, CompanyService, $stateParams) {
        'ngInject';
        this.CompanyService = CompanyService;
        this.channelName = $stateParams.channel;
        this.msgForm = {};        
        CompanyService.getAllMessages(this.channelName).then(resp => {
            this.messages = resp.data;
        });
    }

    sendMessage(form, data) {
        data.channel = this.channelName;
        this.CompanyService.sendChannelMessage(data).then( resp => {
            this.messages.push(resp.data);
            form.$setPristine();
            this.msgForm = {}; //reset form data
        });
    } 
}

export {
    IndexCtrl,
    CompanyDetailCtrl,
    ChannelMessagesCtrl
};