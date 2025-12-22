import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionHeader from "../add-product/SectionHeader";
import { Input } from "@/components/ui/input";

export default function Social({ form }) {
  return (
    <div className="bg-card p-5 rounded-lg">
      <SectionHeader
        title="Social Media"
        description="Add your social media links to connect with customers across platforms"
      />

      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        <FormField
          control={form.control}
          name="facebook"
          rules={{
            pattern: {
              value: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
              message: "Please enter a valid Facebook URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Facebook Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://facebook.com/yourstore"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitter"
          rules={{
            pattern: {
              value: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/i,
              message: "Please enter a valid Twitter/X URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Twitter Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://twitter.com/yourstore"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          rules={{
            pattern: {
              value: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
              message: "Please enter a valid Instagram URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Instagram Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://instagram.com/yourstore"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtube"
          rules={{
            pattern: {
              value: /^https?:\/\/(www\.)?youtube\.com\/.+/i,
              message: "Please enter a valid YouTube URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">YouTube Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://youtube.com/@yourstore"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
