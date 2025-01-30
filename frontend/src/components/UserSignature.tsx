import ProfilePicture from "@/components/ProfilePicture";
import { User } from "@/types";

type UserSignatureProps = {
  user: User;
  includeFollowers?: boolean;
};
export default function UserSignature({
  user,
  includeFollowers,
}: UserSignatureProps) {
  return (
    <div className="flex items-center">
      <ProfilePicture user={user} size={1.5} />
      <div className="ml-3">
        <div className={includeFollowers ? "font-bold" : ""}>
          {user.display_name}
        </div>
        {includeFollowers && <div>{user.total_followers} followers</div>}
      </div>
    </div>
  );
}
