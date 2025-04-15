'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, MessageCircle, MoreVertical } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EmailAddress, PhoneNumber, User } from '@clerk/nextjs/server';
import { createNewConversationAction } from '@/lib/actions'; // Import the action

export interface UserData extends User {
  primaryEmailAddress: EmailAddress | null;
  primaryPhoneNumber: PhoneNumber | null;
  primaryWeb3Wallet: null;
  fullName: string | null;
  metadata: {
    tags?: string[];
    rating?: number;
    bio?: string;
    stagesCompleted?: number;
    disciples?: number;
    responses?: number;
  };
}

export default function FindMentorPageComponent() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user: currentUser } = useUser();
  const router = useRouter();

  const defaultMetadata = (user: UserData): UserData['metadata'] => ({
    tags: Array.isArray(user.metadata?.tags)
      ? user.metadata.tags
      : ['Love', 'Community', 'Bible'],
    rating:
      typeof user.metadata?.rating === 'number' ? user.metadata.rating : 3,
    bio:
      typeof user.metadata?.bio === 'string'
        ? user.metadata.bio
        : 'No bio available',
    stagesCompleted:
      typeof user.metadata?.stagesCompleted === 'number'
        ? user.metadata.stagesCompleted
        : 3,
    disciples:
      typeof user.metadata?.disciples === 'number'
        ? user.metadata.disciples
        : 15,
    responses:
      typeof user.metadata?.responses === 'number'
        ? user.metadata.responses
        : 1000,
  });

  useEffect(() => {
    const fetchUserList = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch('/api/users');
        const data: {
          success: boolean;
          data: { data: UserData[] };
          message?: string;
        } = await response.json();

        if (data.success) {
          const usersWithDefaultMetadata = data.data.data.map(
            (user: UserData) => ({
              ...user,
              metadata: defaultMetadata(user),
            })
          );

          if (currentUser) {
            const filteredUsers = usersWithDefaultMetadata.filter(
              (user: UserData) => user.id !== currentUser.id
            );
            setUserList(filteredUsers);
          } else {
            setUserList(usersWithDefaultMetadata);
          }
        } else {
          console.error('Failed to fetch users:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserList();
  }, [currentUser]);

  const handleStartChat = async (userId: string) => {
    try {
      // Fetch the user data
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();

      // Call createNewConversationAction with the fetched data
      const result = await createNewConversationAction({
        name: `${userData.firstName} ${userData.lastName}`, // Use the user's name as the channel name
        imageUrl: userData.imageUrl, // Use the user's image as the channel image
        selectedUsers: [userId], // Add the selected user to the channel
      });

      if (result?.error) {
        console.error('Error creating conversation:', result.error);
        return;
      }

      // Redirect to the new chat
      router.push(`/find-discipler/${userId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const filteredUsers = userList.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.metadata.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Discover a mentor</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <MessageCircle className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 rounded-full text-[10px] flex items-center justify-center text-white">
                  {userList.length}
                </span>
              </div>
              <Bell className="h-6 w-6 text-gray-600" />
              <Avatar>
                <AvatarImage src={currentUser?.imageUrl} />
                <AvatarFallback>{currentUser?.firstName?.[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-center max-w-2xl mx-auto">
            Find mentors to help in your growth. Browse available mentors find a
            match, prayerfully consider then and when you are sure feel free to
            send them a chat
          </p>
          <div className="mt-6 relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="search a tag, level, name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Dialog key={user.id}>
              <DialogTrigger asChild>
                <div className="bg-white rounded-lg border p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>
                          {user.firstName?.[0] ?? 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
                      </div>
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < (user?.metadata?.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {user.metadata.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>
                        {user.firstName?.[0] ?? 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <DialogTitle className="mb-2">{`${user.firstName} ${user.lastName}`}</DialogTitle>
                      <div className="flex gap-2 justify-center">
                        {user.metadata.tags?.map((tag, i) => (
                          <Badge key={i} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-center gap-8 text-center">
                    <div>
                      <div className="text-xl font-semibold">
                        {user.metadata.stagesCompleted}⭐
                      </div>
                      <div className="text-sm text-gray-500">
                        Stages completed
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">
                        {user.metadata.disciples}
                      </div>
                      <div className="text-sm text-gray-500">Disciples</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">
                        {user.metadata.responses}
                      </div>
                      <div className="text-sm text-gray-500">Responses</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{user.metadata.bio}</p>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-[#0F1531] hover:bg-[#0F1531]/90"
                      onClick={() => handleStartChat(user.id)}
                    >
                      Start chat
                    </Button>
                    <Button variant="outline" className="w-full">
                      Save to prospects
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {filteredUsers.length >= 12 && (
          <div className="mt-8 text-center">
            <Button variant="outline" className="px-8">
              Load more
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}