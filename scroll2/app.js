// App is global
function App() {};
App.namespace = function() {
    var objectList = {};
    function namespace(name) {
        if (typeof objectList[name] === "undefined") {
            objectList[name] = {};
        }
        return objectList[name];
    }
    return namespace;
}();
