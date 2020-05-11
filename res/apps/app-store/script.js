const data = {
    labels: [],
    apps: [],
};

YLApp.onReady(function () {

    console.log('on app store app ready function...')


})

new Vue({
    el: "#app",
    data: {
        search: "",
        labels: [],
        apps: [],
    },
    created: function () {
        const that = this;
        Yuri2.loadContentFromUrl('./data.json','get',function (err,str) {
            const data = JSON.parse(str);
            const labels = data.labels;
            const apps = data.apps;
            const labelsLoaded = [];
            labels.forEach(function (t) {
                labelsLoaded.push({
                    name: t,
                    active: true,
                    color: that.getRandomColor()
                })
            });
            that.$set(that, 'labels', labelsLoaded);
            that.$set(that, 'apps', apps);
        });


    },
    methods: {
        appClick: function (app) {
            if (app.url) {
                YLApp.eval('open',{url:app.url,title:app.title});
            }

        },
        labelClick: function (l) {
            l.active = !l.active;
        },
        isAppActive: function (app) {
            const that = this;
            let rel = false;
            const labels = app.labels;
            const hash = {};
            labels.forEach(function (t) {
                hash[t] = true;
            });
            this.labelsActive.forEach(function (t) {
                let checkList = [
                    app.title,
                    app.url,
                ];
                checkList = checkList.concat(app.labels);
                let inWord = false;
                checkList.forEach(function (t2) {
                    if (typeof t2 === "string" && t2.indexOf(that.search) !== -1) {
                        inWord = true;
                    }
                });
                if (hash[t] && inWord) {
                    rel = true;
                }
            });
            return rel;

        },
        labelStyle: function (label) {
            return {
                "color": label.active ? "white" : label.color,
                "border-color": label.active ? "white" : label.color,
                "background-color": !label.active ? "white" : label.color,
            }
        },
        getRandomColor: function () {
            const r = Yuri2.randInt(0, 200);
            const g = Yuri2.randInt(0, 200);
            const b = Yuri2.randInt(0, 200);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
    },
    computed: {
        labelsActive: function () {
            const ls = [];
            this.labels.forEach(function (t) {
                if (t.active)
                    ls.push(t.name)
            });
            return ls;
        },
    }
})

