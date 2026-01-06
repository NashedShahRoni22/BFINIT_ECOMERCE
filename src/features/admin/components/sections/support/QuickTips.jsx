import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function QuickTips() {
  return (
    <>
      <small className="text-muted-foreground text-xs">
        Use the toolbar to format your content with headings, lists, links and
        images
      </small>

      <Alert className="mt-2">
        <AlertTitle className="text-xs">Writing Tips</AlertTitle>
        <AlertDescription className="mt-1">
          <ul className="list-inside list-disc space-y-0.5 text-xs">
            <li>Use clear headings to organize your content</li>
            <li>Break down complex topics into numbered steps</li>
            <li>Add screenshots to illustrate instructions</li>
            <li>Keep paragraphs short and scannable</li>
          </ul>
        </AlertDescription>
      </Alert>
    </>
  );
}
