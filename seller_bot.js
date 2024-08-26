import discord
from discord.ext import commands
from discord.ui import Button, View

# Intents are necessary for accessing certain types of events
intents = discord.Intents.default()
intents.message_content = True

# Create a bot instance
bot = commands.Bot(command_prefix='!', intents=intents)

# Dictionary to store items for sale
items_for_sale = {
    "discord_link": {"price": 100, "description": "This is a Discord link 🧩."},
    "another_item": {"price": 200, "description": "This is another item 🎁."}
}

class ItemView(View):
    def __init__(self, item_name):
        super().__init__()
        self.item_name = item_name

    @discord.ui.button(label="🛒 Buy Now", style=discord.ButtonStyle.green, custom_id="buy_button")
    async def buy_button(self, button: Button, interaction: discord.Interaction):
        item = items_for_sale.get(self.item_name)
        if item is None:
            await interaction.response.send_message(f"No item named '{self.item_name}' found.", ephemeral=True)
            return
        
        # Dummy price check
        user_balance = 200  # Replace with actual balance checking logic
        if user_balance < item['price']:
            await interaction.response.send_message(f"You don't have enough money to buy {self.item_name}.", ephemeral=True)
            return
        
        # Placeholder for actual transaction logic
        await interaction.response.send_message(f"Thank you for buying {self.item_name}! You spent ${item['price']}.", ephemeral=True)

class ProductListView(View):
    def __init__(self):
        super().__init__()
        self.add_buttons_for_items()

    def add_buttons_for_items(self):
        for item_name in items_for_sale.keys():
            button = Button(label=f"{item_name} 🛍️", style=discord.ButtonStyle.secondary, custom_id=f"item_{item_name}")
            button.callback = self.item_button_callback
            self.add_item(button)

    async def item_button_callback(self, interaction: discord.Interaction):
        item_name = interaction.custom_id.replace("item_", "discord_link")
        item = items_for_sale.get(item_name)
        if item is None:
            await interaction.response.send_message(f"No item named '{item_name}' found.", ephemeral=True)
            return
        
        # Dummy price check
        user_balance = 200  # Replace with actual balance checking logic
        if user_balance < item['price']:
            await interaction.response.send_message(f"You don't have enough money to buy {item_name}.", ephemeral=True)
            return
        
        # Placeholder for actual transaction logic
        await interaction.response.send_message(f"Thank you for buying {item_name}! You spent ${item['price']}.", ephemeral=True)

class ListItemsView(View):
    @discord.ui.button(label="🛒 List Items", style=discord.ButtonStyle.primary, custom_id="list_items_button")
    async def list_items_button(self, button: Button, interaction: discord.Interaction):
        if not items_for_sale:
            await interaction.response.send_message("No items are currently available for sale.", ephemeral=True)
            return
        
        items_list = "\n".join([f"{item} 📦: {details['description']} - ${details['price']}" for item, details in items_for_sale.items()])
        embed = discord.Embed(title="🛍️ Items for Sale", description=items_list, color=discord.Color.blue())
        await interaction.response.send_message(embed=embed, view=ProductListView())

# Command to initiate the list of items view
@bot.command(name='start')
async def start(ctx):
    view = ListItemsView()
    await ctx.send("Welcome! Click the button below to see the available items.", view=view)

# Event when the bot is ready
@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

# Run the bot
bot.run('MTI2MTI1NTYzOTk1NTQxMDk5NQ.GALtbJ.ghddaoQiRrsqE_QBGv2pQYRQ8gXvCoyBIpfQXQ')
