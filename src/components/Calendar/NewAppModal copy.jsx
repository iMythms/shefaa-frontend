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
import { Select, SelectContent, SelectItem } from '@/components/ui/select'

export const NewAppModal = ({ appData, open, setOpen, onSubmit }) => {
  if (!appData && !open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button var</DialogContent>iant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[500px]">
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
              <Label className="text-right">Service:</Label>
              <Select id="service" name="service" className="col-span-3">
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
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
            {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Description:</Label>
            <Label className="col-span-3">
              {appData.extendedProps.description}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status:</Label>
            <Label className="col-span-3">{appData.extendedProps.status}</Label>
          </div> */}
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
