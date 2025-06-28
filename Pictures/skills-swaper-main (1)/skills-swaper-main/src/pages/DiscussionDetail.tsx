
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { DiscussionDetailView } from "@/components/discussions/DiscussionDetailView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DiscussionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Discussion not found</h1>
          <Button onClick={() => navigate('/discussions')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discussions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
              <TopNav />
            </div>
            <main className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-800/30">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/discussions')}
                    className="flex items-center gap-2 hover:bg-white/80 dark:hover:bg-gray-800/80"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Discussions
                  </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <DiscussionDetailView discussionId={id} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DiscussionDetail;
