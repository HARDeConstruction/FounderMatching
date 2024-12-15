"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileAPI } from "@/lib/api/profiles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateProfilePage() {
  const { createUserProfile } = useProfileAPI();
  const [formData, setFormData] = useState({ Name: "", Occupation: "", AvatarURL: "", IsStartup: false });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createUserProfile({ ProfileInfo: formData });
      router.push(`/dashboard/profile/me`);
    } catch (err) {
      console.error("Failed to create profile:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" />
          <Input name="Occupation" value={formData.Occupation} onChange={handleChange} placeholder="Occupation" />
          <Input name="AvatarURL" value={formData.AvatarURL} onChange={handleChange} placeholder="Avatar URL" />
          <select
            name="IsStartup"
            value={formData.IsStartup ? "true" : "false"}
            onChange={(e) => setFormData((prev) => ({ ...prev, IsStartup: e.target.value === "true" }))}
            className="w-full border p-2 rounded"
          >
            <option value="true">Startup</option>
            <option value="false">Candidate</option>
          </select>
          <Button onClick={handleSubmit}>Create Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
