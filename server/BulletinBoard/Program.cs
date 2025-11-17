using BulletinBoard.Core.Models;
using BulletinBoard.Core.Services;
using BulletinBoard.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton<BulletinService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("Yaeli_Shmuel_1999_207069584_314907528_yanon_s@#$%^^&*()"))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();

    });
});

var app = builder.Build();

// אם רוצים הפנייה ל-HTTPS
//app.UseHttpsRedirection();

// CORS חייב להיות לפני Authentication/Authorization
app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

// OpenAPI רק בסביבת פיתוח
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.Run();