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

export const AppDetailsModal = ({ appData, open, setOpen, changeStatus }) => {
  if (!appData && !open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{appData.title}</DialogTitle>
          <DialogDescription>{appData.extendedProps.service}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Date:</Label>
            <Label className="col-span-3">{appData.startStr}</Label>

            {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Doctor:</Label>
            <Label className="col-span-3">{appData.extendedProps.doctor}</Label>
            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Description:</Label>
            <Label className="col-span-3">
              {appData.extendedProps.description}
            </Label>
            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status:</Label>
            <Label className="col-span-3">{appData.extendedProps.status}</Label>
            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {appData.extendedProps.status === 'new' ? (
              <>
                <Button name="rejected" id={appData.id} onClick={changeStatus}>
                  Cancel
                </Button>
                <Button name="approved" id={appData.id} onClick={changeStatus}>
                  Approve
                </Button>
                <Button name="arrived" id={appData.id} onClick={changeStatus}>
                  Arrived
                </Button>
                <Button name="delete" id={appData.id} onClick={changeStatus}>
                  Delete
                </Button>
              </>
            ) : null}
            {appData.extendedProps.status === 'approved' ? (
              <>
                <Button name="rejected" id={appData.id} onClick={changeStatus}>
                  Cancel
                </Button>
                <Button name="arrived" id={appData.id} onClick={changeStatus}>
                  Arrived
                </Button>
              </>
            ) : null}
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
