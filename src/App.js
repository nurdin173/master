import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Registrasi from './components/auth/Registrasi';

import ListAnnual from './components/partials/Annual/ListAnnual';
import FormAnnual from './components/partials/Annual/FormAnnual';
import AnnualRequest from './components/partials/Annual/AnnualRequest';
import Dashboard from './components/partials/Dashboard/Dashboard';
import Company from './components/partials/Company/Company';
import Employee from './components/partials/Employee/Employee';
import EmployeeForm from './components/partials/Employee/EmployeeForm';
import EmployeeUpdateForm from './components/partials/Employee/EmployeeUpdateForm';
import EmployeeView from './components/partials/Employee/EmployeeView';
import ProfileView from './components/partials/Employee/ProfileView';
import ProfileUpdateForm from './components/partials/Employee/ProfileUpdateForm';
import ReportAnnual from './components/partials/Reporting/ReportAnnual';
import DetailReportAnnual from './components/partials/Reporting/DetailReportAnnual';
import ReportAttendee from './components/partials/Reporting/ReportAttendee';
import DetailReportAttendee from './components/partials/Reporting/DetailReportAttendee';

import Attendee from './components/partials/Attendee/Attendee';
import DetailAttendee from './components/partials/Attendee/DetailAttendee';
import FaceRegister from './components/partials/Attendee/FaceRegister';
import Forbidden from './components/auth/Forbidden';
import BadRequest from './components/auth/BadRequest';
import DetailAnnual from './components/partials/Annual/DetailAnnual';
import Position from './components/partials/Position/Position';
import PositionForm from './components/partials/Position/PositionForm';
import EditPosition from './components/partials/Position/EditPosition';
import ListNotifications from './components/partials/ListNotifications/ListNotifications';
import Libur from './components/partials/TimeSheet/Libur';
import Project from './components/partials/TimeSheet/Project';
import Shift from './components/partials/TimeSheet/Shift';
import EditShift from './components/partials/TimeSheet/EditShift';
import EditProject from './components/partials/TimeSheet/EditProject';
import EditLibur from './components/partials/TimeSheet/EditLibur';
import NotFound from './components/auth/NotFound';
import InsertShift from './components/partials/TimeSheet/InsertShift';
import InsertProject from './components/partials/TimeSheet/InsertProject';
import InsertLibur from './components/partials/TimeSheet/InsertLibur';
import InsertUserShiftProject from './components/partials/TimeSheet/InsertUserShiftProject';

import { PrivateRoute, AdminRoute, SuperAdminRoute, ApproveRoute } from './components/_security/PrivateRoute';
import AnnualLeave from './components/partials/Annual/AnnualLeave';
import Unit from './components/partials/Unit/Unit';
import FomUnit from './components/partials/Unit/FormUnit';
import EditUnit from './components/partials/Unit/EditUnit';
import { LoginPage } from './components/auth/LoginPage';
import { history } from './components/_helpers';
import { alertActions } from './components/_actions';

class App extends React.Component {
  constructor(props) {
      super(props);
      
      history.listen((location, action) => {
          // clear alert on location change
          this.props.clearAlerts();
      });
  }

  render(){
    return (
      <div>
            <div className="App">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router history={history}>
                <div className="route">
                  <Switch>
                    <Route exact path="/registrasi" component={Registrasi} />
                    <Route exact path="/logout" component={LoginPage} />
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/forbidden" component={Forbidden} />
                    <Route exact path="/bad-request" component={BadRequest} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <ApproveRoute exact path="/annual/list" component={ListAnnual} />
                    <PrivateRoute exact path="/annual/form" component={FormAnnual} />
                    <ApproveRoute exact path="/annual/request" component={AnnualRequest} />
                    <PrivateRoute exact path="/annual/detail" component={DetailAnnual} />
                    <AdminRoute exact path="/annual/leave" component={AnnualLeave} />
                    <PrivateRoute exact path="/company" component={Company} />
                    <AdminRoute exact path="/employee" component={Employee} />
                    <AdminRoute exact path="/employee/form" component={EmployeeForm} />
                    <AdminRoute exact path="/employee/update" component={EmployeeUpdateForm} />
                    <AdminRoute exact path="/employee/view" component={EmployeeView} />
                    <PrivateRoute exact path="/profile" component={ProfileView} />
                    <PrivateRoute exact path="/profile/edit" component={ProfileUpdateForm} />
                    <AdminRoute exact path="/report/annual" component={ReportAnnual} />
                    <AdminRoute exact path="/report/annual/detail" component={DetailReportAnnual} />
                    <AdminRoute exact path="/report/attendee" component={ReportAttendee} />
                    <AdminRoute exact path="/report/attendee/detail" component={DetailReportAttendee} />
                    <AdminRoute exact path="/position" component={Position} />
                    <AdminRoute exact path="/position/form" component={PositionForm} />
                    <AdminRoute exact path="/position/form-edit" component={EditPosition} />
                    <PrivateRoute exact path="/notifications" component={ListNotifications} />
                    <AdminRoute exact path="/unit/form" component={FomUnit} />
                    <AdminRoute exact path="/unit" component={Unit} />
                    <AdminRoute exact path="/unit/edit" component={EditUnit} />
                    <PrivateRoute exact path="/attendee/absen" component={Attendee} />
                    <PrivateRoute exact path="/attendee/detail" component={DetailAttendee} />
                    <AdminRoute exact path="/attendee/register" component={FaceRegister} />
                    <PrivateRoute exact path="/timesheet/libur" component={Libur} />
                    <PrivateRoute exact path="/timesheet/project" component={Project} />
                    <PrivateRoute exact path="/timesheet/shift" component={Shift} />
                    <PrivateRoute exact path="/timesheet/edit-shift" component={EditShift} />
                    <PrivateRoute exact path="/timesheet/edit-project" component={EditProject} />
                    <PrivateRoute exact path="/timesheet/edit-libur" component={EditLibur} />
                    <PrivateRoute exact path="/timesheet/insert-shift" component={InsertShift} />
                    <PrivateRoute exact path="/timesheet/insert-project" component={InsertProject} />
                    <PrivateRoute exact path="/timesheet/insert-libur" component={InsertLibur} />
                    <PrivateRoute exact path="/timesheet/insert-user-shift-project" component={InsertUserShiftProject} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Router>
            </div>
      </div>
  );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);