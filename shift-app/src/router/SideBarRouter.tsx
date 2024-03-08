import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '../pages/admin/DashboardPage'
import { BranchIndexPage } from '../pages/admin/branchs/BranchIndexPage'
import { DepartmentIndexPage } from '../pages/admin/departments/DepartmentIndexPage'
import { UserIndexPage } from '../pages/admin/users/UserIndexPage'
import { ViewPage } from '../pages/view_screen/ViewPage'
import { OptionScreenPage } from '../pages/OptionScreenPage'
import { ServicePage } from '../pages/service_screen/ServicePage'
import { TicketPage } from '../pages/ticket_screen/TicketPage'

export const SideBarRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/branchs" element={<BranchIndexPage />} />
        <Route path="/departments" element={<DepartmentIndexPage />} />
        <Route path="/users" element={<UserIndexPage />} />
        <Route path="/check_screen" element={<ViewPage/>} />
        <Route path="/option_page" element={<OptionScreenPage/>} />
        <Route path="/service_screen" element={<ServicePage/>} />
        <Route path="/ticket_screen" element={<TicketPage/>} />
    </Routes>
  )
}
