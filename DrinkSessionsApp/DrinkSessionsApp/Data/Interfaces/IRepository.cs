using DrinkSessionsApp.Models;
using System.Linq.Expressions;

namespace DrinkSessionsApp.Data
{
    public interface IRepository<T> where T : class
    {

        IQueryable<T> GetAll();
        Task<T?> GetById(int id);
        Task Create(T item);
        Task Update(T item);
        Task Delete(T item);
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate);
        Task<T?> GetOneWhere(Expression<Func<T, bool>> predicate);
    }
}
