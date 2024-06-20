use starknet::ContractAddress;

#[starknet::interface]
pub trait IYourContract<TContractState> {
    fn greeting(self: @TContractState) -> ByteArray;
    fn totalCounter(self: @TContractState) -> u256;
    fn set_greeting(ref self: TContractState, new_greeting: ByteArray, amount_eth: u256);
    fn get_eventname_byid(self: @TContractState, id: u256) -> ByteArray;
    fn get_eventlocaiton_byid(self: @TContractState, id: u256) -> ByteArray;
    fn create_event(ref self: TContractState, name: ByteArray, location: ByteArray);
    fn withdraw(ref self: TContractState);
    fn premium(self: @TContractState) -> bool;
}

#[starknet::contract]
mod YourContract {
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::token::erc20::interface::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};
    use starknet::{get_caller_address, get_contract_address};
    use super::{ContractAddress, IYourContract};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    const ETH_CONTRACT_ADDRESS: felt252 =
        0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        GreetingChanged: GreetingChanged
    }

    #[derive(Drop, starknet::Event)]
    struct GreetingChanged {
        #[key]
        greeting_setter: ContractAddress,
        #[key]
        new_greeting: ByteArray,
        premium: bool,
        value: u256,
    }


    #[storage]
    struct Storage {
        eth_token: IERC20CamelDispatcher,
        greeting: ByteArray,
        premium: bool,
        total_counter: u256,
        user_greeting_counter: LegacyMap<ContractAddress, u256>,
        total_events: u256,
        event_name: LegacyMap<u256, ByteArray>,
        event_location: LegacyMap<u256, ByteArray>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        let eth_contract_address = ETH_CONTRACT_ADDRESS.try_into().unwrap();
        self.eth_token.write(IERC20CamelDispatcher { contract_address: eth_contract_address });
        self.greeting.write("Building Unstoppable Apps!!!");
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl YourContractImpl of IYourContract<ContractState> {
        fn greeting(self: @ContractState) -> ByteArray {
            self.greeting.read()
        }
        fn totalCounter(self: @ContractState) -> u256 {
            self.total_counter.read()
        }
        fn get_eventname_byid(self: @ContractState, id: u256) -> ByteArray {
            self.event_name.read(id)
        }
        fn get_eventlocaiton_byid(self: @ContractState, id: u256) -> ByteArray {
            self.event_location.read(id)
        }
        fn create_event(ref self: ContractState, name: ByteArray, location: ByteArray) {
            self.event_name.write(self.total_events.read(), name);
            self.event_location.write(self.total_events.read(), location);
            self.total_events.write(self.total_events.read() + 1);
        }
        fn set_greeting(ref self: ContractState, new_greeting: ByteArray, amount_eth: u256) {
            self.greeting.write(new_greeting);
            self.total_counter.write(self.total_counter.read() + 1);
            let user_counter = self.user_greeting_counter.read(get_caller_address());
            self.user_greeting_counter.write(get_caller_address(), user_counter + 1);

            if amount_eth > 0 {
                // call approve on UI
                self
                    .eth_token
                    .read()
                    .transferFrom(get_caller_address(), get_contract_address(), amount_eth);
                self.premium.write(true);
            } else {
                self.premium.write(false);
            }
            self
                .emit(
                    GreetingChanged {
                        greeting_setter: get_caller_address(),
                        new_greeting: self.greeting.read(),
                        premium: true,
                        value: 100
                    }
                );
        }
        fn withdraw(ref self: ContractState) {
            self.ownable.assert_only_owner();
            let balance = self.eth_token.read().balanceOf(get_contract_address());
            self.eth_token.read().transfer(self.ownable.owner(), balance);
        }
        fn premium(self: @ContractState) -> bool {
            self.premium.read()
        }
    }
}
