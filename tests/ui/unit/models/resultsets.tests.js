import { getProjectUrl } from "../../../../ui/helpers/url";

describe('ThResultSetStore', function(){

    var $httpBackend,
        rootScope,
        model,
        repoModel,
        foregroundRepo = "mozilla-inbound";

    beforeEach(angular.mock.module('treeherder'));

    beforeEach(inject(function ($injector, $rootScope, $controller,
                                ThResultSetStore, ThRepositoryModel) {

        $httpBackend = $injector.get('$httpBackend');
        jasmine.getJSONFixtures().fixturesPath='base/tests/ui/mock';

        $httpBackend.whenGET('https://treestatus.mozilla-releng.net/trees/mozilla-inbound').respond(
            {
                "result": {
                    "status": "approval required",
                    "message_of_the_day": "I before E",
                    "tree": "mozilla-inbound",
                    "reason": ""
                }
            }

        );

        $httpBackend.whenGET(getProjectUrl('/jobs/0/unclassified_failure_count/', foregroundRepo)).respond(
            {
                "unclassified_failure_count": 1152,
                "repository": "mozilla-inbound"
            }
        );

        $httpBackend.whenGET(getProjectUrl('/resultset/?count=10&full=true', foregroundRepo)).respond(
            getJSONFixture('push_list.json')
        );


        $httpBackend.whenGET(getProjectUrl('/jobs/?count=2000&result_set_id=1&return_type=list', foregroundRepo)).respond(
            getJSONFixture('job_list/job_1.json')
        );

        $httpBackend.whenGET(getProjectUrl('/jobs/?count=2000&result_set_id=2&return_type=list', foregroundRepo)).respond(
            getJSONFixture('job_list/job_2.json')
        );

        $httpBackend.whenGET('/api/repository/').respond(
            getJSONFixture('repositories.json')
        );

        $httpBackend.whenGET('/api/jobtype/').respond(
            getJSONFixture('job_type_list.json')
        );

        $httpBackend.whenGET('/api/jobgroup/').respond(
            getJSONFixture('job_group_list.json')
        );

        rootScope = $rootScope.$new();
        rootScope.repoName = foregroundRepo;

        repoModel = ThRepositoryModel;
        repoModel.load(rootScope.repoName);

        model = ThResultSetStore;
        model.initRepository(rootScope.repoName);
        model.fetchPushes(10);

        $httpBackend.flush();
    }));

    /*
        Tests ThResultSetStore
     */
    it('should have 2 resultset', function() {
        expect(model.getPushArray().length).toBe(2);
    });

    it('should have id of 1 in foreground (current) repo', function() {
        expect(model.getPushArray()[0].id).toBe(1);
    });
});
