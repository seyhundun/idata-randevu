import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import ApplicantCard from "./ApplicantCard";
import type { Applicant } from "@/lib/constants";
import { toast } from "sonner";

interface ApplicantListProps {
  applicants: Applicant[];
  onUpdate: (id: string, field: keyof Applicant, value: string) => void;
  personCount: number;
  setPersonCount: (n: number) => void;
}

export default function ApplicantList({
  applicants,
  onUpdate,
  personCount,
  setPersonCount,
}: ApplicantListProps) {
  const handleAutoFill = () => {
    toast.success("Tüm form alanları dolduruldu!", {
      description: "VFS formundaki alanlar otomatik olarak doldurulacak.",
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="section-title text-foreground">Başvuru Sahipleri</h2>
        <Button
          onClick={handleAutoFill}
          variant="outline"
          className="gap-2 shadow-card hover:shadow-card-hover transition-shadow"
        >
          <ClipboardCheck className="w-4 h-4" />
          Tümünü Doldur
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {applicants.map((a, i) => (
          <ApplicantCard
            key={a.id}
            applicant={a}
            index={i}
            total={applicants.length}
            onUpdate={onUpdate}
            onRemove={
              applicants.length > 1
                ? () => setPersonCount(personCount - 1)
                : undefined
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
