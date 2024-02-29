import express from 'express';
import {createContainer, asClass} from 'awilix';
import { TestService } from './services/test.service';
import {scopePerRequest} from 'awilix-express';
import { BranchMongoRepository } from './services/repositories/impl/mongodb/branch.repository';
import { BranchService } from './services/branch.service';
import { DepartmentMongoRepository } from './services/repositories/impl/mongodb/department.repository';
import { DepartmentService } from './services/department.service';
import { BranchDepartmentMongoRepository } from './services/repositories/impl/mongodb/branchdepartment.repository';
import { BranchDepartmentService } from './services/branchdepartment.service';
import { ManagementTypeMongoRepository } from './services/repositories/impl/mongodb/management_type.repository copy';
import { ManagementTypeService } from './services/management_type.service';
import { DepartmentManagementService } from './services/deparment_management.service';
import { DepartmentManagementMongoRepository } from './services/repositories/impl/mongodb/department_management.repository';
import { UserMongoRepository } from './services/repositories/impl/mongodb/user.repository';
import { UserService } from './services/user.service';
import { RoleMongoRepository } from './services/repositories/impl/mongodb/role.repository';
import { RoleService } from './services/role.service';
import { ShiftMongoRepository } from './services/repositories/impl/mongodb/shift.repository';
import { ShiftService } from './services/shift.service';
import { AttendShiftMongoRepository } from './services/repositories/impl/mongodb/attend_shift.repository';
import { AttendShiftService } from './services/attend_shift.service';

export default (app: express.Application) =>{
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        //respositories
        branchRepository: asClass(BranchMongoRepository).scoped(),
        departmentRepository: asClass(DepartmentMongoRepository).scoped(),
        branchDepartmentRepository: asClass(BranchDepartmentMongoRepository).scoped(),
        managementTypeRepository: asClass(ManagementTypeMongoRepository).scoped(),
        deparmentManagementRepository: asClass(DepartmentManagementMongoRepository).scoped(),
        userRepository: asClass(UserMongoRepository).scoped(),
        roleRepository: asClass(RoleMongoRepository).scoped(),
        shiftRepository: asClass(ShiftMongoRepository).scoped(),
        attendShiftRepository: asClass(AttendShiftMongoRepository).scoped(),
        
        //services
        branchService: asClass(BranchService).scoped(),
        departmentService: asClass(DepartmentService).scoped(),
        branchDepartmentService: asClass(BranchDepartmentService).scoped(),
        managementTypeService: asClass(ManagementTypeService).scoped(),
        deparmentManagementService: asClass(DepartmentManagementService).scoped(),
        userService: asClass(UserService).scoped(),
        roleService: asClass(RoleService).scoped(),
        shiftService: asClass(ShiftService).scoped(),
        attendShiftService: asClass(AttendShiftService).scoped(),

        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}