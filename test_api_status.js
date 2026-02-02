const axios = require('axios');

const baseUrl = 'http://localhost:4000';
const DUMMY_ID = '507f1f77bcf86cd799439011';

// Same list as before
const endpoints = [
    { method: 'POST', url: '/admin/login' },
    { method: 'POST', url: '/admin/superadmin/register' },
    { method: 'POST', url: '/admin/college_school' },
    { method: 'GET', url: '/admin/college_school' },
    { method: 'PATCH', url: `/admin/college_school/${DUMMY_ID}` },
    { method: 'DELETE', url: `/admin/college_school/${DUMMY_ID}` },
    { method: 'POST', url: '/admin/general_settings' },
    { method: 'GET', url: '/admin/general_settings' },
    { method: 'PATCH', url: `/admin/general_settings/${DUMMY_ID}` },
    { method: 'DELETE', url: `/admin/general_settings/${DUMMY_ID}` },
    { method: 'POST', url: '/admin/busdetails' },
    { method: 'GET', url: '/admin/busdetails' },
    { method: 'GET', url: `/admin/busdetails/${DUMMY_ID}` },
    { method: 'PATCH', url: `/admin/busdetails/${DUMMY_ID}` },
    { method: 'DELETE', url: `/admin/busdetails/${DUMMY_ID}` },
    { method: 'POST', url: '/admin/transportchoose' },
    { method: 'GET', url: '/admin/transportchoose' },
    { method: 'POST', url: '/admin/transport-credentials' },
    { method: 'GET', url: '/admin/transport-credentials' },
    { method: 'PATCH', url: `/admin/transport-credentials/${DUMMY_ID}` },
    { method: 'DELETE', url: `/admin/transport-credentials/${DUMMY_ID}` },
    { method: 'POST', url: '/admin/add_bus' },
    { method: 'POST', url: '/admin/getbus' },
    { method: 'PATCH', url: '/admin/edit_bus' },
    { method: 'POST', url: '/admin/delete_bus' },
    { method: 'POST', url: '/admin/add_driver' },
    { method: 'POST', url: '/admin/getdrivers' },
    { method: 'PATCH', url: '/admin/edit_driver' },
    { method: 'POST', url: '/admin/delete_driver' },
    { method: 'POST', url: '/admin/add_student' },
    { method: 'POST', url: '/admin/getstudents' },
    { method: 'PATCH', url: '/admin/edit_student' },
    { method: 'POST', url: '/admin/delete_student' },
    { method: 'POST', url: '/admin/student_attendance' },
    { method: 'POST', url: '/admin/add_parent' },
    { method: 'PATCH', url: '/admin/edit_parent' },
    { method: 'POST', url: '/admin/delete_parent' },
    { method: 'POST', url: '/admin/add_route' },
    { method: 'POST', url: '/admin/getroutedetails' },
    { method: 'PATCH', url: '/admin/edit_route' },
    { method: 'POST', url: '/admin/deleteroutedetails' },
    { method: 'POST', url: '/admin/asign_route' },
    { method: 'POST', url: '/admin/add_stations' },
    { method: 'POST', url: '/admin/getstations' },
    { method: 'PATCH', url: '/admin/edit_stations' },
    { method: 'POST', url: '/admin/delete_stations' },
    { method: 'GET', url: '/admin/waiting_locations' },
    { method: 'POST', url: '/admin/waiting_locations' },
    { method: 'PUT', url: `/admin/waiting_locations/${DUMMY_ID}` },
    { method: 'DELETE', url: `/admin/waiting_locations/${DUMMY_ID}` },
    { method: 'POST', url: '/admin/add_notifications' },
    { method: 'POST', url: '/admin/notifications' },
    { method: 'GET', url: '/admin/notifications' },
    { method: 'POST', url: '/admin/fetch_school' },
    { method: 'POST', url: '/admin/newcomment' },
    { method: 'GET', url: '/admin/comments' },
    { method: 'DELETE', url: `/admin/comment/${DUMMY_ID}` },
    { method: 'POST', url: '/mobile_api/v1/driver_login' },
    { method: 'POST', url: '/mobile_api/v1/fetch_route' },
    { method: 'POST', url: '/mobile_api/v1/fetch_Driver_route' },
    { method: 'POST', url: '/mobile_api/v1/parent_login' },
    { method: 'POST', url: '/mobile_api/v1/fetch_driver' },
    { method: 'POST', url: '/mobile_api/v1/fetch_pickupdrop_stations' },
    { method: 'PATCH', url: '/mobile_api/v1/filter_bustop' },
    { method: 'POST', url: '/api/v1/newcomment' },
    { method: 'GET', url: '/api/v1/comments' },
    { method: 'DELETE', url: `/api/v1/comment/${DUMMY_ID}` },
    { method: 'GET', url: '/api/v1/login' },
];

async function checkEndpoints() {
    console.log(`Checking ${endpoints.length} endpoints...`);
    const results = [];

    for (const endpoint of endpoints) {
        // console.log(`Testing ${endpoint.method} ${endpoint.url}...`); // Uncomment to see live progress
        try {
            const res = await axios({
                method: endpoint.method,
                url: `${baseUrl}${endpoint.url}`,
                timeout: 3000, // 3s timeout per request
                validateStatus: () => true
            });

            const isSuccess = res.status < 500;
            results.push({
                method: endpoint.method,
                url: endpoint.url,
                status: res.status,
                working: isSuccess
            });

            // if (isSuccess) console.log(`✅ ${res.status}`);
            if (!isSuccess) console.log(`❌ ${endpoint.method} ${endpoint.url} -> ${res.status}`);

        } catch (error) {
            results.push({
                method: endpoint.method,
                url: endpoint.url,
                status: error.code || 'ERROR',
                working: false
            });
            console.log(`❌ ${endpoint.method} ${endpoint.url} -> Error: ${error.message}`);
        }
    }

    // Summary of failures
    const failures = results.filter(r => !r.working);
    if (failures.length > 0) {
        console.log(`\nFound ${failures.length} FAILED endpoints.`);
        // failures.forEach(f => console.log(`- ${f.method} ${f.url} (${f.status})`));
    } else {
        console.log('\n✅ All 68 API endpoints are reachable and NOT crashing (Status < 500).');
    }
}

checkEndpoints();
