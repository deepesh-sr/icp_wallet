use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk_macros::update;
use std::cell::RefCell;

#[derive(CandidType, Deserialize, Default)]
struct Wallet {
    address: String,
    balance: u64,
}

thread_local! {
    static WALLET: RefCell<Wallet> = RefCell::new(Wallet::default());
}

#[update]
fn get_balance() -> u64 {
    WALLET.with(|wallet| wallet.borrow().balance)
}

#[update]
fn send_tokens(recipient: String, amount: u64) -> Result<(), String> {
    WALLET.with(|wallet| {
        let mut wallet = wallet.borrow_mut();
        if wallet.balance < amount {
            return Err("Insufficient balance.".to_string());
        }
        wallet.balance -= amount;
        Ok(())
    })
}

#[update]
fn receive_tokens(amount: u64) {
    WALLET.with(|wallet| {
        let mut wallet = wallet.borrow_mut();
        wallet.balance += amount;
    });
}
