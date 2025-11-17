using BulletinBoard.Core.Models;
using System.Text.Json;

namespace BulletinBoard.Core.Services
{
    public class UserService
    {
        private readonly string _filePath = Path.Combine("Data", "users.json");

        public List<User> LoadUsers()
        {
            if (!File.Exists(_filePath))
                return new List<User>();

            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<User>>(json)
                   ?? new List<User>();
        }

        public void SaveUsers(List<User> users)
        {
            var json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        //public User AddUser(User user)
        //{
        //    var list = LoadUsers();
        //    user.Id = list.Count == 0 ? 1 : list.Max(x => x.Id) + 1;
        //    list.Add(user);
        //    SaveUsers(list);

        //    return user;
        //}
    }

}

