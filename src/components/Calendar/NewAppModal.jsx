import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/Textarea'

export const NewAppModal = ({ appData, open, setOpen, onSubmit, services }) => {
  if (!appData && !open) {
    return null
  }
  console.log(services)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button var</DialogContent>iant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            {appData.doctor} @ {appData.date}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Date:</Label>
              <Input
                id="date"
                name="date"
                disabled={true}
                value={appData.date}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Doctor:</Label>
              <Input
                id="doctor"
                name="doctor"
                disabled={true}
                value={appData.doctor}
                className="col-span-3"
              />
              <Input
                id="docId"
                name="docId"
                type="hidden"
                value={appData.docId}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Service:</Label>
              <select name="services" id="services" className="col-span-3">
                <option key="0" value="0">
                  -- SELECT SERVICE --
                </option>
                {services
                  ? services.map((service, index) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient Name:</Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient Phone:</Label>
              <Input id="phone" name="phone" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient CPR:</Label>
              <Input id="cpr" name="cpr" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient email:</Label>
              <Input id="email" name="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient email:</Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Button className="col-span-4" type="submit">
                Add Appointment
              </Button>
            </div>
          </div>
        </form>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
