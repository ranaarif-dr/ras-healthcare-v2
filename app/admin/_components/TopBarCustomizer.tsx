"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "@/types/appwrite.types";
import { updateSettings } from "@/actions/settings.actions";

export default function TopbarCustomizer({ settings }: { settings: Settings }) {
  const [isLoading, setIsLoading] = useState(false);
  const [topbarSettings, setTopbarSettings] = useState({
    enabled: settings.topbar_enabled,
    text: settings.topbar_text,
    backgroundColor: settings.topbar_bg_color,
    textColor: settings.topbar_text_color,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTopbarSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (checked: boolean) => {
    setTopbarSettings((prev) => ({ ...prev, enabled: checked }));
  };

  const handleSave =async () => {
    setIsLoading(true);

    try {
        const settingsData = {
            topbar_enabled: topbarSettings.enabled,
            topbar_text: topbarSettings.text,
            topbar_bg_color: topbarSettings.backgroundColor,
            topbar_text_color: topbarSettings.textColor,
        };
        await updateSettings(settingsData);

    } catch (error) {
        console.log("Error saving settings:", error);
    }
    setIsLoading(false);
};

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Topbar Customizer</CardTitle>
          <CardDescription>
            Customize your store&apos;s promotional topbar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="topbar-enabled"
                checked={topbarSettings.enabled}
                onCheckedChange={handleToggle}
              />
              <Label htmlFor="topbar-enabled">Enable Topbar</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="topbar-text">Topbar Text</Label>
              <Input
                id="topbar-text"
                name="text"
                value={topbarSettings.text}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="background-color"
                  name="backgroundColor"
                  type="color"
                  value={topbarSettings.backgroundColor}
                  onChange={handleChange}
                  className="w-12 h-12 p-1"
                />
                <Input
                  name="backgroundColor"
                  value={topbarSettings.backgroundColor}
                  onChange={handleChange}
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="text-color"
                  name="textColor"
                  type="color"
                  value={topbarSettings.textColor}
                  onChange={handleChange}
                  className="w-12 h-12 p-1"
                />
                <Input
                  name="textColor"
                  value={topbarSettings.textColor}
                  onChange={handleChange}
                  className="flex-grow"
                />
              </div>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>{isLoading ? "Saving" : "Save Settings"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Topbar Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {topbarSettings.enabled && (
            <div
              style={{
                backgroundColor: topbarSettings.backgroundColor,
                color: topbarSettings.textColor,
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              {topbarSettings.text}
            </div>
          )}
          {!topbarSettings.enabled && (
            <p className="text-center text-gray-500">
              Topbar is currently disabled
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
