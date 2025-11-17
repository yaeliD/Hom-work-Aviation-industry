using BulletinBoard.Core.Models;
using System.Text.Json;

namespace BulletinBoard.Services
{
    public class BulletinService
    {
        private readonly string _filePath = Path.Combine("Data", "bulletins.json");

        public BulletinService()
        {
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory("Data");
                File.WriteAllText(_filePath, "[]");
            }
        }

        private List<Bulletin> Load()
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Bulletin>>(json) ?? new();
        }

        private void Save(List<Bulletin> list)
        {
            var json = JsonSerializer.Serialize(list, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        public List<Bulletin> GetAll() => Load();

        public Bulletin? Get(int id) =>
            Load().FirstOrDefault(x => x.Id == id);

        public Bulletin Add(Bulletin item)
        {
            var list = Load();
            item.Id = list.Count == 0 ? 1 : list.Max(x => x.Id) + 1;
            list.Add(item);
            Save(list);

            return item;
        }

        public Bulletin? Update(int id, Bulletin updated)
        {
            var list = Load();
            var existing = list.FirstOrDefault(x => x.Id == id);

            if (existing == null) return null;

            existing.Title = updated.Title;
            existing.Description = updated.Description;
            existing.Author = updated.Author;

            Save(list);
            return existing;
        }

        public bool Delete(int id)
        {
            var list = Load();
            var item = list.FirstOrDefault(x => x.Id == id);
            if (item == null) return false;

            list.Remove(item);
            Save(list);
            return true;
        }
    }
}
