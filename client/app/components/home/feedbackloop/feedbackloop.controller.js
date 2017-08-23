import conf from "../../../app.conf";

class FeedbackloopController {
    constructor($http) {
        'ngInject';
        this.item = {};
        this.page = 1;
        this.name = 'feedbackloop';
        this.entriesPerPage = 10;
        this.$http = $http;
        this.getItems();
    }

    getItems() {
        this.$http.get(
            `${conf.urls.backendUrl}/feedback`,
            {params:{limit: this.entriesPerPage, offset: (this.page - 1) * this.entriesPerPage}})
            .then((res) => {
                this.item = res.data;
            })
    }

    next() {

        this.page++;
        this.getItems();
    }

    prev() {
        if (this.page <= 1) return;
        this.page--;
        this.getItems();
    }
}

export default FeedbackloopController;
