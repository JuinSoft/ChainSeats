use async_graphql::{InputObject, Request, Response, SimpleObject};
use linera_sdk::{
    base::{ChainId, ContractAbi, ServiceAbi, Timestamp},
    graphql::GraphQLMutationRoot,
    views::{CustomSerialize, ViewError},
};
use serde::{Deserialize, Serialize};

pub struct EventAbi;

impl ContractAbi for EventAbi {
    type Operation = Operation;
    type Response = ();
}

impl ServiceAbi for EventAbi {
    type Query = Request;
    type QueryResponse = Response;
}

#[derive(Debug, Serialize, Deserialize, GraphQLMutationRoot)]
pub enum Operation {
    SubscribeEvent {
        chain_id: ChainId,
    },
    UnsubscribeEvent {
        chain_id: ChainId,
    },
    Event {
        time: String,
        name: String,
        place: String,
        description: String,
        participants: u32,
        image_url: String,
    },
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub enum Message {
    SubscribeEvent,
    UnsubscribeEvent,
    Events { count: u64, events: Vec<MyEvent> },
}

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize, SimpleObject)]
pub struct MyEvent {
    pub timestamp: Timestamp,
    pub name: String,
    pub place: String,
    pub description: String,
    pub participants: u32,
    pub image_url: String,
}

/// A event on the Events app.
#[derive(Clone, PartialEq, Debug, Serialize, Deserialize)]
pub struct Event {
    pub key: Key,
    pub time: String,
    pub name: String,
    pub place: String,
    pub description: String,
    pub participants: u32,
    pub image_url: String,
}

/// Disclaimer: Below code is refered from Linera examples from Github repo
/// A key by which a event is indexed.
#[derive(Clone, PartialEq, Debug, Serialize, Deserialize, SimpleObject, InputObject)]
#[graphql(input_name = "KeyInput")]
pub struct Key {
    pub timestamp: Timestamp,
    pub author: ChainId,
    pub index: u64,
}

// Serialize keys
impl CustomSerialize for Key {
    fn to_custom_bytes(&self) -> Result<Vec<u8>, ViewError> {
        let data = (
            (!self.timestamp.micros()).to_be_bytes(),
            &self.author,
            (!self.index).to_be_bytes(),
        );
        Ok(bcs::to_bytes(&data)?)
    }

    fn from_custom_bytes(short_key: &[u8]) -> Result<Self, ViewError> {
        let (time_bytes, author, idx_bytes) = (bcs::from_bytes(short_key))?;
        Ok(Self {
            timestamp: Timestamp::from(!u64::from_be_bytes(time_bytes)),
            author,
            index: !u64::from_be_bytes(idx_bytes),
        })
    }
}
