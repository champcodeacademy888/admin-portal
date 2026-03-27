-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text not null check (role in ('sales_admin', 'enrolled_admin', 'tutor', 'management', 'super_admin')),
  country text not null check (country in ('SG', 'MY', 'PH', 'ID', 'AE', 'HK', 'LK')),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Super admins can view all profiles
create policy "Super admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Management can view all profiles
create policy "Management can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'management'
    )
  );

-- Users in same country can view each other's profiles
create policy "Same country users can view profiles"
  on public.profiles for select
  using (
    country = (
      select country from public.profiles
      where id = auth.uid()
    )
  );

-- Super admins can update any profile
create policy "Super admins can update profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup (trigger function)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, country)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New User'),
    coalesce(new.raw_user_meta_data->>'role', 'sales_admin'),
    coalesce(new.raw_user_meta_data->>'country', 'SG')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
