"use client";
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock, ShieldAlert } from "lucide-react";

const SecureAuthDialog = () => {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setOpen(true);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const validatePin = () => {
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN;

    if (!pin || pin.length !== 6) {
      setError('PIN must be 6 digits');
      return;
    }

    try {
      if (pin === correctPin) {
        const token = btoa(Date.now().toString());
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        setOpen(false);
        setError('');
      } else {
        setError('Invalid PIN');
        setPin('');
      }
    } catch (err) {
      console.error('Validation error:', err);
      setError('Authentication failed. Please try again.');
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setPin(value);
    setError(''); // Clear error when user types
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isAuthenticated) {
      setOpen(newOpen);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validatePin();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Admin Authentication Required
          </DialogTitle>
          <DialogDescription>
            Please enter your 6-digit admin PIN to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">Admin PIN</Label>
            <Input
              id="pin"
              type="password"
              placeholder="Enter 6-digit PIN"
              value={pin}
              onChange={handlePinChange}
              className="text-center tracking-widest"
              maxLength={6}
              autoFocus
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={pin.length !== 6}
          >
            Validate PIN
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SecureAuthDialog;
